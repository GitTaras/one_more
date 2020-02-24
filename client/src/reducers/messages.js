import ACTION from '../actions/actionTypes';

const initialState = {
  error: false,
  isLoading: false,
  etext: '',
  hasMore: false,
  messages: [],
};

export default function Messages(state = initialState, action) {
  switch (action.type) {
    case ACTION.FCHAT_MESSAGES_LOADING:
      return { ...state, isLoading: true };
    case ACTION.FCHAT_MESSAGES_ERROR:
      return { ...state, isLoading: false, error: true, etext: action.etext };
    case ACTION.FCHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: [...action.messages.reverse(), ...state.messages],
        isLoading: false,
        error: false,
        etext: '',
        hasMore: action.hasMore,
      };
    case ACTION.POST_CHAT_MESSAGE_SUCCESS: {
      const newMessages = state.messages.concat(action.message);
      return {
        ...state,
        isLoading: false,
        error: false,
        etext: '',
        messages: newMessages,
      };
    }
    case ACTION.DELETE_CHAT_MESSAGE_SUCCESS: {
      const filtered = state.messages.filter(m => m.id !== action.id);
      return {
        ...state,
        isLoading: false,
        error: false,
        etext: '',
        messages: filtered,
      };
    }
    default:
      return state;
  }
}
