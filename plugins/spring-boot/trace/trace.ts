namespace SpringBoot {

  export class Trace {
    timestamp: string
    method: string
    path: string
    httpStatusCode: number
    timeTaken: number
    info: any

    constructor(trace) {
      const parser = document.createElement('a');
      parser.href = trace.request.uri;

      this.timestamp = trace.timestamp;
      this.method = trace.request.method;
      this.path = parser.pathname;
      this.info = trace;

      if (angular.isNumber(trace.timeTaken)) {
        this.timeTaken = parseInt(trace.timeTaken);
      }

      if (trace.response.status) {
        this.httpStatusCode = parseInt(trace.response.status);
      }
    }
  }
}