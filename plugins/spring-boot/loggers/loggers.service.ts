/// <reference path="logger.ts"/>

namespace SpringBoot {

  export class LoggersService {

    constructor(private jolokiaService: JVM.JolokiaService) {
      'ngInject';
    }

    getLoggerConfiguration(): ng.IPromise<LoggerConfiguration> {
      return this.jolokiaService.execute('org.springframework.boot:type=Endpoint,name=Loggers', 'loggers')
        .then(data => {
          let loggers: Logger[] = [];

          angular.forEach(data.loggers, (loggerInfo, loggerName: string) => {
            let logger: Logger = {
              name: loggerName,
              configuredLevel: loggerInfo.configuredLevel == null ? loggerInfo.effectiveLevel : loggerInfo.configuredLevel,
              effectiveLevel: loggerInfo.effectiveLevel
            }
            loggers.push(logger);
          })

          let loggerConfiguration: LoggerConfiguration = {
            levels: data.levels,
            loggers: loggers
          }

          return loggerConfiguration;
        });
    }

    setLoggerLevel(logger: Logger): ng.IPromise<void> {
      return this.jolokiaService.execute('org.springframework.boot:type=Endpoint,name=Loggers', 'configureLogLevel', logger.name, logger.configuredLevel);
    }
  }
}