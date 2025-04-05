
export enum StartParamType {
  NONE = "n",
  REFERRAL = "r",
}


export class TMAUtils {
  static parseStartParam(startParam: string | null) {
    if (!startParam) {
      return {
        type: StartParamType.NONE,
        value: null,
      };
    }
  
    const [type, value] = startParam.split("_");
  
    if (!value) {
      return {
        type: StartParamType.NONE,
        value: null,
      };
    }
  
    if (type === StartParamType.REFERRAL) {
      return {
        type: StartParamType.REFERRAL,
        value: Number(value),
      };
    }
  
    return {
      type,
      value,
    };
  };
}
