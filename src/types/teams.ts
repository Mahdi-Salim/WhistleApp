export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  birthDate: string;
  nationality?: string;
}
export interface StaffMember {
  id: number;
  name: string;
  role:
    | "HeadCoach"
    | "AssistantCoach"
    | "GoalkeeperCoach"
    | "Physiotherapist"
    | "MediaOfficer"
    | "TeamManager"
    | "equipmentManager";
}
export interface Team {
  id: number;
  name: string;
  city: string;
  logo?: string;
 degree: string;          // الدرجة (مثل الدرجة الأولى، الثانية، إلخ)
  staff: StaffMember[];     // الطاقم الفني والإداري
  players: Player[];        // قائمة اللاعبين (حتى 40)
}
