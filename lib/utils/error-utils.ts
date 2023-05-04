import { AuthError } from "@supabase/supabase-js";

type AnyError = AuthError | null;

export function logError<T>(error: AnyError, message = "", returnValue?: T): T | undefined {
  if (error) {
    console.log(`ERROR: ${message}`, error.message);
  }

  return returnValue;
}

export function translateError(error: AuthError): string {
  switch (error.status) {
    case 400:
      return "E-Mail und/oder Passwort falsch oder dein Account ist noch nicht aktiviert";
    case 401:
      return "Der Aktivierungscode ist falsch";
    case 404:
      return "Es scheint so, als wärst du noch nicht registriert";
    case 422:
      return error.message.toLowerCase().includes("password")
        ? "Das Passwort muss mindestens aus 6 Zeichen bestehen"
        : "Format der E-Mail ist ungültig";
    default:
      return `${error.message} (${error.status})`;
  }
}
