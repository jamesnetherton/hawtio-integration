/// <reference path="../../includes.d.ts" />
/// <reference path="osgiHelpers.d.ts" />
/// <reference path="osgiPlugin.d.ts" />
/**
 * @module Osgi
 */
declare module Osgi {
    function formatAttributesAndDirectivesForPopover(data: {}, skipVersion: boolean): string;
    function formatServiceName(objClass: any): string;
}
