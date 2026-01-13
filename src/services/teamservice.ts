import { Team, Player, StaffMember } from "@/types/teams";

let teams: Team[] = [
  {
    id: 1,
    name: "نادي الوحدة",
    city: "دمشق",
    degree: "الدرجة الأولى",
    logo: "/images/teams/alwahda.png",

    staff: [
      { id: 1, name: "محمد قويض", role: "HeadCoach" },
      { id: 2, name: "حسام السيد", role: "AssistantCoach" },
      { id: 3, name: "أحمد عباس", role: "GoalkeeperCoach" },
      { id: 4, name: "محمود علي", role: "Physiotherapist" },
      { id: 5, name: "علي حسين", role: "MediaOfficer" },
      { id: 6, name: "سامر حسن", role: "TeamManager" },
      { id: 7, name: "زياد يوسف", role: "equipmentManager" },
    ],

    players: [
      {
        id: 1,
        name: "عبد الرحمن يوسف",
        position: "حارس مرمى",
        number: 1,
        nationality: "سوري",
        birthDate: "1998-05-12",
      },
      {
        id: 2,
        name: "فراس الخطيب",
        position: "مهاجم",
        number: 9,
        nationality: "سوري",
        birthDate: "1997-03-21",
      },
      {
        id: 3,
        name: "علاء الدالي",
        position: "وسط",
        number: 8,
        nationality: "سوري",
        birthDate: "1999-11-02",
      },
    ],
  },

  {
    id: 2,
    name: "نادي الاتحاد",
    city: "حلب",
    degree: "الدرجة الممتازة",
    logo: "/images/teams/alittihad.png",

    staff: [
      { id: 8, name: "حسين عفش", role: "HeadCoach" },
      { id: 9, name: "أيمن حكيم", role: "AssistantCoach" },
      { id: 10, name: "مروان درويش", role: "TeamManager" },
    ],

    players: [
      {
        id: 4,
        name: "مجد محمد",
        position: "مدافع",
        number: 4,
        nationality: "سوري",
        birthDate: "2000-01-15",
      },
      {
        id: 5,
        name: "أنس دهان",
        position: "وسط",
        number: 6,
        nationality: "سوري",
        birthDate: "1998-07-09",
      },
    ],
  },
];

/* =========================
   Service
========================= */

export const teamService = {
  // جلب جميع الفرق
  async getAll(): Promise<Team[]> {
    return Promise.resolve(teams);
  },

  // جلب فريق حسب ID
  async getById(id: number): Promise<Team | null> {
    const team = teams.find((t) => t.id === id);
    return Promise.resolve(team ?? null);
  },

  // إنشاء فريق جديد
  async create(team: Omit<Team, "id">): Promise<Team> {
    const newTeam: Team = {
      ...team,
      id: Date.now(),
    };
    teams.push(newTeam);
    return Promise.resolve(newTeam);
  },

  // تحديث بيانات فريق
  async update(id: number, updatedTeam: Team): Promise<Team> {
    teams = teams.map((team) =>
      team.id === id ? updatedTeam : team
    );
    return Promise.resolve(updatedTeam);
  },

  // حذف فريق
  async delete(id: number): Promise<void> {
    teams = teams.filter((team) => team.id !== id);
    return Promise.resolve();
  },
};
