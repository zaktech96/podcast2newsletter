'use server';

export async function testServerAction() {
  console.log('🟢 TEST SERVER ACTION CALLED - THIS SHOULD APPEAR IN TERMINAL');
  return { message: 'Server action is working!' };
} 