import { RoomProvider } from "../liveblocks.config";
import { useRouter } from "next/router";
import LiveAvatars from "../components/LiveAvatars";
import {  useEffect, useMemo, useState } from "react";
import styles from "../styles/Index.module.css";
import { LiveKitRoom,AudioConference,useParticipants,useToken, VideoConference } from "@livekit/components-react";
import { faker } from '@faker-js/faker';


export default function Example() {
  const roomId = useOverrideRoomId("nextjs-live-avatars-advanced");
  const livekitToken = useToken('/api/livekitAuth',roomId,{userInfo:{identity: faker.name.firstName() ,name:faker.name.firstName()}})

  return (
    <RoomProvider id={roomId} initialPresence={{}}>
    <LiveAvatars />
      <LiveKitRoom 
      audio
      video
      token={livekitToken} 
      serverUrl="ws://192.168.0.43:7880" connect={true}
      >
          <AudioConference/>
      </LiveKitRoom>
    </RoomProvider>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useOverrideRoomId(roomId: string) {
  const { query } = useRouter();
  const overrideRoomId = useMemo(() => {
    return query?.roomId ? `${roomId}-${query.roomId}` : roomId;
  }, [query, roomId]);

  return overrideRoomId;
}

