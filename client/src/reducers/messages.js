import ACTION from '../actions/actionTypes';

const initialState = {
  error: false,
  isLoading: false,
  etext: '',
  messages: [
    {
      id: 23223,
      message: 'fjdklfdflkdflkld0',
    },
    {
      id: 3455,
      message: 'fjdklfdflkdflkld0',
    },
    {
      id: 545443,
      message: 'fjdklfdflkdflkld0',
    },
    {
      id: 678,
      message: 'fjdklfdflkdflkld0',
    },
    {
      id: 2325,
      message: 'fjdklfdflkdflkld0',
    },
  ],
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
        messages: action.messages,
        isLoading: false,
        error: false,
        etext: '',
      };
    case ACTION.ADD_MESSAGE: {
      const newMessages = state.messages.concat({
        id: Date.now(),
        message: action.message,
      });
      return {
        ...state,
        messages: newMessages,
      };
    }
    default:
      return state;
  }
}
