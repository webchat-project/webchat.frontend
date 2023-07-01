import React from 'react'

import ChatDelete from './ChatDelete'

export default function ChatDeleteContainer({ chatList, jwt, getChatList }) {

    return chatList.map((c) => (
        <ChatDelete
            getChatList={getChatList}
            jwt={jwt}
            chat={c}
            key={c.userId}
        />
    ));
}
