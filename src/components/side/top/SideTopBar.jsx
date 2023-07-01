import React from "react";
import SideTopBarButton from "./SideTopBarButton";

export default function SideTopBar({ getChatList, getContactList, getProfile, getRequestList }) {

  // Barra superiore mostrata nella side section
  return (
    <div id="side-top-bar">
      <SideTopBarButton route="chats" material="chat" name="Chat" getChatList={getChatList} />
      <SideTopBarButton route="contacts" material="group" name="Contatti" getContactList={getContactList} getRequestList={getRequestList} />
      <SideTopBarButton route="profile" material="settings" name="Profilo" getProfile={getProfile} />
    </div>
  );
}
