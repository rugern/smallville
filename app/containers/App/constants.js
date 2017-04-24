/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const GET_MODELS = 'get_models';
export const SET_CONNECTION_STATUS = 'set_connection_status';
export const SET_METROPOLIS_STATUS = 'set_metropolis_status';
export const GET_METROPOLIS_STATUS = 'get_metropolis_status';
export const SET_MODEL_NAME = 'set_model_name';
export const SET_DATAFILE = 'set_datafile';
export const ADD_METROPOLIS_INFO = 'add_metropolis_info';
export const SET_INFO = 'set_info';
export const CLEAR_INFO = 'clear_info';
export const SET_MODELS = 'set_models';
export const SET_DATAFILES = 'set_datafiles';
export const GET_DATAFILES = 'get_datafiles';
export const GET_DATAFILE = 'get_datafile';
