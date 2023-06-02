import React from 'react'

export default function Message({message, owner}) {
  return(
    <div class={owner}>
        <p class="message-text">{message}</p>
    </div>
  )
}