import React from "react";
import SideTopBarButton from "./SideTopBarButton";

export default function SideTopBar() {
  
  return (
    <div id="side-top-bar">
      <SideTopBarButton route="chats" material="chat" name="Chat" />
      <SideTopBarButton route="contacts" material="group" name="Contatti" />
      <SideTopBarButton route="profile" material="account_circle" name="Profilo"/>
    </div>
  );
}
