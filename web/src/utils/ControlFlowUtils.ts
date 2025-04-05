interface RetrySettings<T> {
  retries: number;
  delay_ms?: number;
  condition?: (result: T) => boolean;
}

export class ControlFlowUtils {
  static async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static retry<T>({
    retries,
    delay_ms = 3000,
    condition,
  }: RetrySettings<T>) {
    return async function retry(exec: () => Promise<T>) {
      let attempts = 0;
      let result: T;

      while (attempts <= retries) {
        try {
          result = await exec();
          if (condition) {
            if (condition(result)) {
              return result; // 如果满足条件，返回结果
            }
          } else {
            return result; // 如果条件为空，直接返回结果
          }
        } catch (error) {
          if (attempts === 0) {
            console.error(`ControlFlowUtils.retry: Request failed, tap to retry`, error);
          } else {
            console.error(`ControlFlowUtils.retry: Attempt ${attempts} failed:`, error);
          }
        }
    
        attempts++;
    
        if (attempts < retries) {
          await ControlFlowUtils.delay(delay_ms * attempts);
        }
      }
    
      throw new Error(`ControlFlowUtils.retry: Failed after ${retries} attempts`);
    }
  }
}
