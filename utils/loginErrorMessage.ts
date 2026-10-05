import type {ApiError} from "@/lib/api/clientApi"

export const getLoginErrorMessage = (error: unknown): string => {
    const apiError = error as ApiError;

    if (!apiError.response) {
        return "Не вдалося з’єднатися із сервером. Перевірте підключення до інтернету та спробуйте ще раз.";
    }

    const {status} = apiError.response;

    if (status === 401) {
        return "Неправильний email або пароль";
    }

    if (status >= 500) {
        return "Помилка сервера. Спробуйте пізніше"
    }

    return "Не вдалося увійти";
};