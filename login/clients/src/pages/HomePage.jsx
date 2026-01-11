
import { useEffect, useState } from "react";

import { useAuthStore } from "./useAuthStore";
import { fetchUsers, fetchUserById } from "../lib/usersApi";


const CARD =
  "rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden";
const BTN_GRAD =
  "bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 text-slate-900 font-semibold transition";
const CHIP_GRAD =
  "bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent";

function safeName(u) {
  return u?.nickname || u?.name || u?.email || "User";
}

function Avatar({ src, alt, size = 40 }) {
  return (
    <div
      className="rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src={src || "/avatar.png"}
        alt={alt || "avatar"}
        className="h-full w-full object-cover"
      />
    </div>
  );
}


function MeCard({ onLogout }) {
  const { authUser } = useAuthStore();
  const name = safeName(authUser);
  const avatar = authUser?.profilePic || "/avatar.png";

  return (
    <div className="rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
      <div className="flex items-center gap-3">
        <Avatar src={avatar} alt={name} size={44} />
        <div className="min-w-0 leading-tight">
          <div className="text-white font-semibold truncate">{name}</div>
          <div className={`text-xs ${CHIP_GRAD}`}>Online</div>
        </div>

        <button
          onClick={onLogout}
          className={`ml-auto rounded-xl px-3 py-2 text-sm ${BTN_GRAD}`}
          title="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function FriendsList({ friends, onPickDm }) {
  return (
    <div className={CARD}>
      <div className="px-4 py-3 border-b border-white/10">
        <div className="text-white font-semibold">Friends</div>
        <div className="text-xs text-white/60">{friends.length} friends</div>
      </div>

      <div className="max-h-[60vh] overflow-auto">
        {friends.map((f) => {
          const name = safeName(f);
          const avatar = f.profilePic || "/avatar.png";
          return (
            <button
              key={f._id}
              onClick={() => onPickDm(f._id)}
              className="w-full text-left px-4 py-3 hover:bg-white/5 hover:ring-1 hover:ring-sky-400/20 transition flex items-center gap-3 border-b border-white/5"
            >
              <Avatar src={avatar} alt={name} size={40} />
              <div className="min-w-0">
                <div className="text-white font-medium truncate">{name}</div>
                <div className="text-xs text-white/50 truncate">Tap to chat</div>
              </div>
            </button>
          );
        })}

        {friends.length === 0 && (
          <div className="p-4 text-white/70">
            No friends yet. Add someone 🙂
          </div>
        )}
      </div>
    </div>
  );
}


function Tabs({ tab, setTab }) {
  return (
    <div className="flex gap-2 p-2">
      <button
        onClick={() => setTab("rooms")}
        className={`flex-1 rounded-xl px-3 py-2 text-sm border transition ${
          tab === "rooms"
            ? `border-white/20 ${BTN_GRAD}`
            : "border-white/10 bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        Rooms
      </button>
      <button
        onClick={() => setTab("users")}
        className={`flex-1 rounded-xl px-3 py-2 text-sm border transition ${
          tab === "users"
            ? `border-white/20 ${BTN_GRAD}`
            : "border-white/10 bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        Users
      </button>
    </div>
  );
}

function RoomsTab({ rooms, onPickRoom }) {
  return (
    <div className={CARD}>
      <div className="px-4 py-3 border-b border-white/10">
        <div className="text-white font-semibold">Rooms</div>
        <div className="text-xs text-white/60">Pick a room</div>
      </div>

      <div className="max-h-[70vh] overflow-auto">
        {rooms.map((r) => (
          <button
            key={r.id}
            onClick={() => onPickRoom(r.id)}
            className="w-full text-left px-4 py-3 hover:bg-white/5 hover:ring-1 hover:ring-pink-400/20 transition flex items-center gap-3 border-b border-white/5"
          >
            <div className={`text-white font-medium`}>
              {r.icon ? `${r.icon} ` : ""}{r.name}
            </div>

            {r.pinned && (
              <span className="ml-auto text-xs text-white/60">Pinned</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function UsersTab({ users, loading, onOpenProfile, onQuickDm }) {
  return (
    <div className={CARD}>
      <div className="px-4 py-3 border-b border-white/10">
        <div className="text-white font-semibold">Users</div>
        <div className="text-xs text-white/60">Tap for profile</div>
      </div>

      <div className="max-h-[70vh] overflow-auto">
        {loading ? (
          <div className="p-4 text-white/70">Loading users...</div>
        ) : (
          users.map((u) => {
            const name = safeName(u);
            const avatar = u.profilePic || "/avatar.png";
            return (
              <div
                key={u._id}
                className="px-4 py-3 border-b border-white/5 flex items-center gap-3"
              >
                <button
                  onClick={() => onOpenProfile(u._id)}
                  className="flex items-center gap-3 min-w-0 flex-1 text-left hover:opacity-95"
                >
                  <Avatar src={avatar} alt={name} size={40} />
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">{name}</div>
                    <div className="text-xs text-white/50 truncate">
                      {u.isProfileComplete ? "Profile complete" : "New user"}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => onQuickDm(u._id)}
                  className={`rounded-xl px-3 py-2 text-xs ${BTN_GRAD}`}
                >
                  Chat
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


function CenterHeader({ title, rightBadge }) {
  return (
    <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
      <div className="text-lg font-semibold text-white truncate">{title}</div>
      {rightBadge ? (
        <div className={`text-xs ${CHIP_GRAD}`}>{rightBadge}</div>
      ) : null}
    </div>
  );
}



function SimpleChatCenter({ headerTitle, headerBadge }) {

  return (
    <div className={CARD}>
      <CenterHeader title={headerTitle} rightBadge={headerBadge} />

      <div className="p-5 space-y-3 max-h-[62vh] overflow-auto" dir="rtl">
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-white/10 border border-white/10 px-4 py-3 text-white">
            היי 🙂
            <div className="mt-1 text-[11px] text-white/50">12:03</div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-to-r from-sky-400/90 to-pink-400/90 text-slate-900 px-4 py-3 font-medium">
            מה קורה?
            <div className="mt-1 text-[11px] text-slate-900/70">12:04</div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-sky-400/40"
            placeholder="הקלד הודעה..."
            dir="rtl"
          />
          <button className={`rounded-xl px-5 py-3 ${BTN_GRAD}`}>שלח</button>
        </div>
      </div>
    </div>
  );
}


function ProfileModal({ open, onClose, user, onAddFriend, onStartDm, isFriend }) {
  if (!open) return null;

  const name = safeName(user);
  const avatar = user?.profilePic || "/avatar.png";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <Avatar src={avatar} alt={name} size={56} />
          <div className="min-w-0">
            <div className="text-white text-lg font-semibold truncate">{name}</div>
            <div className="text-xs text-white/60">
              {user?.isProfileComplete ? "Profile complete" : "Profile not complete"}
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm text-white/80">
          <div>
            <span className="text-white/50">Age:</span> {user?.age ?? "—"}
          </div>
          <div>
            <span className="text-white/50">Gender:</span> {user?.gender || "—"}
          </div>
          <div>
            <span className="text-white/50">Joined:</span>{" "}
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => onAddFriend(user)}
            disabled={isFriend}
            className="flex-1 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-60 text-white px-4 py-2 text-sm border border-white/10 transition"
          >
            {isFriend ? "Added ✅" : "Add friend"}
          </button>

          <button
            onClick={() => onStartDm(user?._id)}
            className={`flex-1 rounded-xl px-4 py-2 text-sm ${BTN_GRAD}`}
          >
            Chat
          </button>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 hover:bg-white/15 text-white px-4 py-2 text-sm border border-white/10 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


export default function HomePage() {
 
  const { logout } = useAuthStore();

 
  const [tab, setTab] = useState("rooms"); 
  const [center, setCenter] = useState({ type: "room", id: "general" });


  
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

 
  const [friends, setFriends] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("friends") || "[]");
    } catch {
      return [];
    }
  });

  
  const rooms = [
    { id: "general", name: "General", pinned: true },
    { id: "anime", name: "Anime" },
    { id: "gaming", name: "Gaming" },
    { id: "study", name: "Study" },
    { id: "support", name: "Support"},
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoadingUsers(true);
        const res = await fetchUsers();
        setUsers(res.users || []);
      } finally {
        setLoadingUsers(false);
      }
    })();
  }, []);

  async function openUserProfile(userId) {
    try {
      const res = await fetchUserById(userId);
      setSelectedUser(res.user);
      setOpenProfile(true);
    } catch {
      // fallback
      const fallback = users.find((u) => String(u._id) === String(userId));
      if (fallback) {
        setSelectedUser(fallback);
        setOpenProfile(true);
      }
    }
  }

  function addFriend(user) {
    if (!user?._id) return;
    if (friends.some((f) => String(f._id) === String(user._id))) return;

    const minimal = {
      _id: user._id,
      name: user.name || "",
      nickname: user.nickname || "",
      profilePic: user.profilePic || "/avatar.png",
      age: user.age,
      gender: user.gender,
      createdAt: user.createdAt,
      isProfileComplete: user.isProfileComplete,
    };

    const next = [minimal, ...friends];
    setFriends(next);
    localStorage.setItem("friends", JSON.stringify(next));
  }

  const isFriend = selectedUser
    ? friends.some((f) => String(f._id) === String(selectedUser._id))
    : false;

  function pickRoom(roomId) {
    setCenter({ type: "room", id: roomId });
  }

  function pickDm(userId) {
    if (!userId) return;
    setCenter({ type: "dm", id: userId });
  }

  function startDmFromModal(userId) {
    setOpenProfile(false);
    pickDm(userId);
    
  }


  let centerNode = null;

if (center.type === "room") {
  const r = rooms.find((x) => x.id === center.id);
  centerNode = (
    <SimpleChatCenter
      headerTitle={r ? `${r.icon ? r.icon + " " : ""}${r.name}` : "Room"}
      headerBadge={center.id === "general" ? "Public" : "Room"}
    />
  );
} else if (center.type === "dm") {
  const u =
    users.find((x) => String(x._id) === String(center.id)) ||
    friends.find((x) => String(x._id) === String(center.id));

  centerNode = (
    <SimpleChatCenter
      headerTitle={u ? safeName(u) : "Chat"}
      headerBadge="DM"
    />
  );
} else {
 
  centerNode = (
    <SimpleChatCenter headerTitle="⭐ General" headerBadge="Public" />
  );
}


  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_360px] gap-6 items-start">
          {/* LEFT: Friends */}
          <div className="space-y-3">
            <MeCard onLogout={logout} />
            <FriendsList friends={friends} onPickDm={pickDm} />
          </div>

         
          <div>{centerNode}</div>

          
          <div className="space-y-3">
            <div className={CARD}>
              <Tabs tab={tab} setTab={setTab} />
              <div className="p-3 pt-0">
                {tab === "rooms" ? (
                  <RoomsTab rooms={rooms} onPickRoom={pickRoom} />
                ) : (
                  <UsersTab
                    users={users}
                    loading={loadingUsers}
                    onOpenProfile={openUserProfile}
                    onQuickDm={pickDm}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        user={selectedUser}
        onAddFriend={addFriend}
        onStartDm={startDmFromModal}
        isFriend={isFriend}
      />
    </div>
  );
}
