import {createContext,  useContext, useState,  ReactNode, useEffect} from 'react';
import { loginRequest, getCurrentUser} from '@/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number;
  userName: string;
  email: string;
  RoleId: number;
  RefereeId?: number;
  photo?: string;
};

type AuthContextType = {
  user: User | null;

  token: string | null;

  loading: boolean;

  isAuthenticated: boolean;

  isReferee: boolean;

  isAssessor: boolean;

  login: (
    email: string,
    password: string,
  ) => Promise<User>; 

  logout: () => void;
  initializing: boolean;
};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);
  const [initializing, setInitializing] = useState(true);
  const login = async (
    email: string,
    password: string,
  ): Promise<User> => {

    try {

      setLoading(true);

      const accessToken =
        await loginRequest(
          email,
          password,
        );

      const currentUser =
        await getCurrentUser(
          accessToken
        );

      setToken(accessToken);
      setUser(currentUser);

      await AsyncStorage.setItem(
        'token',
        accessToken
      );
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(currentUser)
      );

      return currentUser;

    } finally {

      setLoading(false);
    }
  };
  useEffect(() => {

  const loadSession =
    async () => {

      try {

        const savedToken =
          await AsyncStorage.getItem(
            'token'
          );

        const savedUser =
          await AsyncStorage.getItem(
            'user'
          );

        if (
          savedToken &&
          savedUser
        ) {

          setToken(savedToken);

          setUser(
            JSON.parse(savedUser)
          );
        }

      } catch (error) {

        console.log(
          'Session restore error',
          error
        );

      } finally {

        setInitializing(false);
      }
    };

  loadSession();

    }, []);
  const logout = async () => {
   await AsyncStorage.removeItem(
    'token'
   );
   await AsyncStorage.removeItem(
    'user'
   );
   setUser(null);
   setToken(null);
  };

  const isAuthenticated =
    !!token;

  const isReferee =
    user?.RoleId === 3;

  const isAssessor =
    user?.RoleId === 2;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,

        login,
        logout,

        isAuthenticated,

        isReferee,
        isAssessor,
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);