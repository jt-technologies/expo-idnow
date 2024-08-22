import ExpoIDnowModule from './ExpoIDnowModule'

/**
 * The token needs to be all uppercase character only and should conform to the following regular expression .{3}-.{5}$
 * @see https://github.com/idnow/de.idnow.ios.sdk.spm?tab=readme-ov-file#usage
 */
const tokenRegex = /.{3}-.{5}$/

export enum ExpoIDnowEnvironment {
  /* https://api.dev.idnow.de */
  DEV = 'DEV',
  DEV_0 = 'DEV_0',
  DEV_1 = 'DEV_1',
  DEV_2 = 'DEV_2',
  DEV_3 = 'DEV_3',
  DEV_4 = 'DEV_4',
  DEV_5 = 'DEV_5',
  DEV_6 = 'DEV_6',
  DEV_7 = 'DEV_7',
  DEV_8 = 'DEV_8',
  DEV_9 = 'DEV_9',

  /* https://api.test.idnow.de */
  TEST = 'TEST',
  TEST_1 = 'TEST_1',
  TEST_2 = 'TEST_2',
  TEST_3 = 'TEST_3',

  /* https://api.staging1.idnow.de */
  STAGING_1 = 'STAGING_1',

  /* https://api.idnow.de */
  LIVE = 'LIVE',

  INTRUM = 'INTRUM',
  INTRUM_TEST = 'INTRUM_TEST',

  CUSTOM = 'CUSTOM',

  /* https://api.online-ident.ch */
  INT = 'INT',

  NOT_DEFINED = 'NOT_DEFINED',
}

export enum ExpoIDnowEnvironmentConnectionType {
  WEBSOCKET = 'WEBSOCKET',
  LONG_POLLING = 'LONG_POLLING',
}

export type ExpoIDnowOptions = {
  language?: string
  environment?: ExpoIDnowEnvironment
  connectionType?: ExpoIDnowEnvironmentConnectionType
  useNewBrand?: boolean
}

export type ExpoIDnowResponse = {
  result: string
  error?: string
}

export async function startIdent(
  token: string,
  companyId: string,
  options?: ExpoIDnowOptions,
): Promise<ExpoIDnowResponse | undefined> {
  if (!tokenRegex.test(token)) {
    throw new Error('Token must match the pattern .{3}-.{5}$')
  }
  if (token !== token.toUpperCase()) {
    throw new Error('Token must be uppercase')
  }

  const response: string = await ExpoIDnowModule.startIdent(
    token,
    companyId,
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
