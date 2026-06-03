import { createContext, useContext, useState, ReactNode } from "react";

type TeamKey = "home" | "away";
type MatchEventType = "goal" | "yellowCard" | "redCard" | "substitution";

type MatchEvent = {
  id: string;
  minute: number;
  type: MatchEventType;
  player: string;
  team: TeamKey;
  playerOut?: string;
  playerIn?: string;
  notes?: string;
};

type Lineup = {
  starters: string[];
  bench: string[];
};

type Kit = {
  shirt: string;
  shorts: string;
  socks: string;
  goalkeeper: {
    shirt: string;
    shorts: string;
    socks: string;
  };
};

type MatchDetails = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  city: string;
  date: string;
  time: string;
  dateTime: string;
  referee: string;
  assistant1: string;
  assistant2: string;
  fourthOfficial: string;
  homeGoals: number;
  awayGoals: number;
  reportSubmitted: boolean;
};

type MatchContextType = {
  match: MatchDetails;
  setMatch: (updates: Partial<MatchDetails>) => void;
  lineups: Record<TeamKey, Lineup>;
  setLineups: (next: Record<TeamKey, Lineup>) => void;
  kits: Record<TeamKey, Kit>;
  setKits: (next: Record<TeamKey, Kit>) => void;
  events: MatchEvent[];
  setEvents: (events: MatchEvent[]) => void;
  addEvent: (event: Omit<MatchEvent, "id">) => void;
  updateEvent: (id: string, updates: Partial<MatchEvent>) => void;
  removeEvent: (id: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  resetMatch: () => void;
  status:
    | 'pending'
    | 'lineups_ready'
    | 'finished'
    | 'submitted';
  setStatus: React.Dispatch<
    React.SetStateAction<
      | 'pending'
      | 'lineups_ready'
      | 'finished'
      | 'submitted'
    >
  >;
};


const defaultMatch: MatchDetails = {
  id: "match-1",
  homeTeam: "الوحدة",
  awayTeam: "الجيش",
  stadium: "ملعب الفيحاء",
  city: "دمشق",
  date: "2026-05-18",
  time: "20:00",
  dateTime: "2026-05-18T20:00:00Z",
  referee: "مهدي سليم",
  assistant1: "خالد علي",
  assistant2: "محمد حسن",
  fourthOfficial: "سامر يوسف",
  homeGoals: 2,
  awayGoals: 1,
  reportSubmitted: false,
};

const defaultLineups: Record<TeamKey, Lineup> = {
  home: {
    starters: ["أحمد علي", "محمد حسن", "خالد يوسف", "سامر محمود"],
    bench: ["أنس خليل", "رامي سليمان"],
  },
  away: {
    starters: ["فراس حمزة", "نور الدين", "وسيم أحمد"],
    bench: ["باسل إبراهيم", "عمر مصطفى"],
  },
};

const defaultKits: Record<TeamKey, Kit> = {
  home: {
    shirt: "أخضر",
    shorts: "أبيض",
    socks: "أخضر",
    goalkeeper: {
      shirt: "أصفر",
      shorts: "أسود",
      socks: "أصفر",
    },
  },
  away: {
    shirt: "أحمر",
    shorts: "أسود",
    socks: "أحمر",
    goalkeeper: {
      shirt: "أزرق",
      shorts: "أزرق",
      socks: "أبيض",
    },
  },
};

const defaultEvents: MatchEvent[] = [
  {
    id: "event-1",
    minute: 12,
    type: "goal",
    player: "محمد حسن",
    team: "home",
  },
  {
    id: "event-2",
    minute: 33,
    type: "yellowCard",
    player: "نور الدين",
    team: "away",
  },
  {
    id: "event-3",
    minute: 71,
    type: "goal",
    player: "خالد يوسف",
    team: "home",
  },
  {
    id: "event-4",
    minute: 84,
    type: "redCard",
    player: "وسيم أحمد",
    team: "away",
  },
];

const MatchContext =
  createContext<MatchContextType | undefined>(undefined);

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function MatchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [match, setMatchState] = useState<MatchDetails>(defaultMatch);
  const [lineups, setLineupsState] = useState<
    Record<TeamKey, Lineup>
  >(defaultLineups);
  const [kits, setKitsState] = useState<
    Record<TeamKey, Kit>
  >(defaultKits);
  const [events, setEventsState] = useState<MatchEvent[]>(
    defaultEvents
  );
  const [notes, setNotesState] = useState("");

  const setMatch = (updates: Partial<MatchDetails>) =>
    setMatchState((previous) => ({
      ...previous,
      ...updates,
    }));

  const addEvent = (event: Omit<MatchEvent, "id">) =>
    setEventsState((previous) => [
      ...previous,
      {
        ...event,
        id: generateId(),
      },
    ]);

  const updateEvent = (
    id: string,
    updates: Partial<MatchEvent>
  ) =>
    setEventsState((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, ...updates }
          : item
      )
    );

  const removeEvent = (id: string) =>
    setEventsState((previous) =>
      previous.filter((item) => item.id !== id)
    );

  const resetMatch = () => {
    setMatchState(defaultMatch);
    setLineupsState(defaultLineups);
    setKitsState(defaultKits);
    setEventsState(defaultEvents);
    setNotesState("");
  };
  const [status, setStatus] = useState<
  'pending'
  | 'lineups_ready'
  | 'finished'
  | 'submitted'>
  ('pending');
  const isLocked = status === 'submitted';
  return (
    <MatchContext.Provider
      value={{
        match,
        setMatch,
        lineups,
        setLineups: setLineupsState,
        kits,
        setKits: setKitsState,
        events,
        setEvents: setEventsState,
        addEvent,
        updateEvent,
        removeEvent,
        notes,
        setNotes: setNotesState,
        resetMatch,
        status,
        setStatus,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error(
      "useMatch must be used within a MatchProvider"
    );
  }
  return context;
};
