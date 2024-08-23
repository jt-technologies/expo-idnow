import ExpoIDnowModule from './ExpoIDnowModule'

/**
 * The token needs to be all uppercase character only and should conform to the following regular expression .{3}-.{5}$
 * @see https://github.com/idnow/de.idnow.ios.sdk.spm?tab=readme-ov-file#usage
 */
const tokenRegex = /.{3}-.{5}$/

export enum ExpoIDnowEnvironment {
  dev = 'dev',
  dev0 = 'dev_0',
  dev1 = 'dev1',
  dev2 = 'dev2',
  dev3 = 'dev3',
  dev4 = 'dev4',
  dev5 = 'dev5',
  /**
   * iOS only
   */
  dev6 = 'dev6',
  dev7 = 'dev7',
  dev8 = 'dev8',
  dev9 = 'dev9',
  test = 'test',
  test1 = 'test1',
  test2 = 'test2',
  test3 = 'test3',
  /**
   * Android only
   */
  int = 'int',
  /**
   * iOS only
   */
  intrum = 'intrum',
  /**
   * iOS only
   */
  intrumTest = 'intrumTest',
  live = 'live',
  staging1 = 'staging1',
  custom = 'custom',
  notDefined = 'notDefined',
}

export enum ExpoIDnowEnvironmentConnectionType {
  websocket = 'websocket',
  longPolling = 'longPolling',
}

export type ExpoIDnowOptions = {
  language?: string
  connectionType?: ExpoIDnowEnvironmentConnectionType
  environment?: ExpoIDnowEnvironment
}

export type ExpoIDnowResultType =
  | 'FAILED'
  | 'SUCCEED'
  | 'CANCELED'
  | 'WRONG_IDENT_ERROR'
  | 'INTERNAL_ERROR'
  | 'UNKNOWN'

export type ExpoIDnowResponse = {
  result: ExpoIDnowResultType
  error?: string
}

export async function startIdent(
  companyId: string,
  token: string,
  options?: ExpoIDnowOptions,
): Promise<ExpoIDnowResponse | undefined> {
  if (!tokenRegex.test(token)) {
    throw new Error('Token must match the pattern .{3}-.{5}$')
  }
  if (token !== token.toUpperCase()) {
    throw new Error('Token must be uppercase')
  }

  const response: string = await ExpoIDnowModule.startIdent(
    companyId,
    token,
    options,
  )

  try {
    const jsonRes: ExpoIDnowResponse = JSON.parse(response)

    return jsonRes
  } catch (error) {
    console.error('Filed to parse ExpoIDnowResponse:', error)
    return undefined
  }
}
