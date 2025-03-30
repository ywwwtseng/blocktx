import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config("blocktx-infra");

const name = config.require("name");
const sshKey = config.requireSecret("ssh");

const keyPair = new aws.ec2.KeyPair(`${name}-keypair`, {
  publicKey: sshKey,
});

const securityGroup = new aws.ec2.SecurityGroup(`${name}-sg`, {
  ingress: [
      { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
      { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
      { protocol: "tcp", fromPort: 443, toPort: 443, cidrBlocks: ["0.0.0.0/0"] },
  ],
  egress: [
    { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] },
  ],
});

const ec2 = new aws.ec2.Instance(`${name}-ec2`, {
  ami: "ami-0fd83fbe170218bda",
  instanceType: "t3.micro",
  keyName: keyPair.keyName,
  vpcSecurityGroupIds: [securityGroup.id],
  userData: `#!/bin/bash
     # 更新软件包
    sudo yum update -y
    
    # 安装 Docker
    sudo yum install -y docker
    
    # 启动 Docker 服务
    sudo systemctl start docker
    sudo systemctl enable docker
  `,
  tags: { Name: `${name}-ec2` },
});

export const publicIp = ec2.publicIp;
