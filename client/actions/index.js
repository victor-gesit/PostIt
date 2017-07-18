export const postMessage = text => {
  return {
    type: 'POST_MESSAGE',
    message
    text
  }
}

export const setVisibilityFilter (message) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}