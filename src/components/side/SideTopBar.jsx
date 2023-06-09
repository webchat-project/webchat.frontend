import React from "react";
import SideTopBarButton from "./SideTopBarButton";

export default function SideTopBar({ setSearchFocus }) {
  return (
    <div id="side-top-bar">
      <SideTopBarButton route="chats" material="chat" name="Chat" setSearchFocus={setSearchFocus} />
      <SideTopBarButton route="contacts" material="group" name="Contatti" setSearchFocus={setSearchFocus} />
      <SideTopBarButton route="profile" material="settings" name="Profilo" setSearchFocus={setSearchFocus} />
    </div>
  );
}
