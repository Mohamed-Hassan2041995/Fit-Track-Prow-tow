export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: string;
          gender: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name: string;
          last_name: string;
          role: string;
          gender: string;
        };
        Update: {
          email?: string;
          first_name?: string;
          last_name?: string;
          role?: string;
          gender?: string;
        };
      };
      // أضف باقي تعريفات الجداول هنا
    };
  };
}