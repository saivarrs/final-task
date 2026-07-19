import logger from '@wdio/logger';

const log = logger('test-steps');

export function logStep(step, message) {
    log.info(`[${step}] ${message}`);
}