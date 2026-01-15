export interface Player {
  name: string;
  num: number;
  sub?: number;
  YCard?: number;
  RCard?: number;
  goal?: number;
  onGoal?: number;
  position: string; // مثال: "GK", "FW", "MF", "DF"
}

export interface Team {
  id?: number;             // id تلقائي من Sequelize
  TeamName: string;
  TeamManager: string;
  Coach: string;
  AssistantCoach?: string;
  KeeperCoach?: string;
  PhysicalTherapist?: string;
  MediaOfficial?: string;
  EquipmentManager?: string;
  Players: Player[];
  TeamLogo?: string;
  DegreeId: number;        // المفتاح الأجنبي للدرجة
}
