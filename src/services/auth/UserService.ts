import { supabase } from '../../utils/supabaseClient';
import { User } from '../../types/user';

const DEFAULT_PASSWORD = 'Fitness@123';

export class UserService {
  async createUser(userData: Partial<User>) {
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: userData.email!,
      password: DEFAULT_PASSWORD,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          gender: userData.gender
        }
      }
    });

    if (authError) throw authError;

    const { data, error } = await supabase
      .from('users')
      .insert({
        id: authUser.user?.id,
        ...userData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async resetPassword(userId: string) {
    const { error } = await supabase.auth.admin.updateUserById(
      userId,
      { password: DEFAULT_PASSWORD }
    );

    if (error) throw error;
  }

  async changePassword(userId: string, newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
  }
}

export const userService = new UserService();