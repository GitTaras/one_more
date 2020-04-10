export const CLEAR_POSTS = 'CLEAR_POSTS';
export const clearPosts = () => ({
  type: CLEAR_POSTS,
});

export const CLEAR_POSTS_ERROR = 'CLEAR_POSTS_ERROR';
export const clearPostsError = () => ({
  type: CLEAR_POSTS_ERROR,
});

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (page = 1, username = '', hashtag = '') => ({
  type: FETCH_POSTS,
  request: {
    url: `/posts/${username}?page=${page}&hash_tag=${hashtag}`,
  },
  meta: {
    asPromise: true,
  },
});

export const CREATE_POST = 'CREATE_POST';
export const createPost = postData => ({
  type: CREATE_POST,
  request: {
    url: '/posts',
    data: postData,
    method: 'post',
  },
  meta: {
    asPromise: true,
  },
});

export const DELETE_POST = 'DELETE_POST';
export const deletePost = id => (dispatch, getState) => {
  const posts = getState().posts.posts;
  const postsWithoutDeleted = posts.filter(post => post.id !== id);
  dispatch({
    type: DELETE_POST,
    request: {
      url: `/posts/${id}`,
      method: 'delete',
    },
    meta: {
      posts,
      postsWithoutDeleted,
    },
  });
};
