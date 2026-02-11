export type EditState = {
  message: string | null;
  errors: Record<string, string[]>;
};

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, { _errors?: string[] } | string[]>;
};

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  userType: "basic" | "seller";
  bio?: string;
};

type UpdateUserInput = {
  name: string;
  email: string;
  bio?: string;
};

// Placeholder implementations to unblock build; replace with real logic.
export async function createUser(
  name: string,
  email: string,
  password: string,
  userType: "basic" | "seller",
  bio?: string
): Promise<ActionResult> {
  const _payload: CreateUserInput = { name, email, password, userType, bio };
  return {
    success: false,
    message: "Create user is not implemented yet.",
  };
}

export async function updateUser(
  userId: string,
  data: UpdateUserInput
): Promise<ActionResult> {
  const _payload = { userId, ...data };
  return {
    success: false,
    message: "Update user is not implemented yet.",
  };
}
