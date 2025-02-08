import { supabase } from '../../utils/supabaseClient';
import { Payment, SubscriptionPlan, Subscription } from '../../types/subscription';

export class PaymentService {
  // إنشاء اشتراك جديد
  async createSubscription(userId: string, planId: string): Promise<Subscription> {
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError) throw planError;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        end_date: endDate,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // معالجة الدفع
  async processPayment(subscriptionId: string, amount: number, paymentMethod: string): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        subscription_id: subscriptionId,
        amount,
        payment_method: paymentMethod,
        status: 'completed'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // جلب تاريخ المدفوعات للمستخدم
  async getUserPaymentHistory(userId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        subscription:subscriptions(*)
      `)
      .eq('subscriptions.user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // جلب الخطط المتاحة
  async getAvailablePlans(): Promise<SubscriptionPlan[]> {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price');

    if (error) throw error;
    return data;
  }
}

export const paymentService = new PaymentService();