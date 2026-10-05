import type {ApiError} from "@/lib/api/clientApi"

export const getRegisterErrorMessage = (error: unknown): string => {
    const apiError = error as ApiError;

    if (!apiError.response) {
        return "Не вдалося з’єднатися із сервером. Перевірте підключення до інтернету та спробуйте ще раз.";
    }

    const {status} = apiError.response;

    if (status === 400) {
        return "Користувач із таким email уже існує";
    }

    if (status >= 500) {
        return "Помилка сервера. Спробуйте пізніше"
    }

    return "Не вдалося зареєструватися";
};