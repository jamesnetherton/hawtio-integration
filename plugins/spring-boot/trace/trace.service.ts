/// <reference path="trace.ts"/>

namespace SpringBoot {

  export class TraceService {

    constructor(private jolokiaService: JVM.JolokiaService) {
      'ngInject';
    }

    getTraces(): ng.IPromise<Trace[]> {
      return this.jolokiaService.execute('org.springframework.boot:type=Endpoint,name=Httptrace', 'traces')
        .then(data => {
          let traces: Trace[] = [];

          // Avoid including our own jolokia requests in the results
          let filteredTraces = data.traces.filter(trace => {return /.*jolokia.*/.test(trace.request.uri) === false;});

          angular.forEach(filteredTraces, (traceEvent) => {
            traces.push(new Trace(traceEvent));
          });

          return traces;
        })
    }
  }
}
