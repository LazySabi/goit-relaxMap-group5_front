"use client";

import Button from "@/components/ui/Button/Button";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useId} from "react";
import {EMAIL_REGEX} from "@/utils/emailRegex";
import Input from "@/components/ui/Input/Input";
import clsx from "clsx";
import Spinner from "@/components/ui/Spinner/Spinner"
import css from "./LoginForm.module.css"
import Icon from "@/components/ui/Icon/Icon"


type LoginFormValues = {
    email: string,
    password: string,
};

const initialValues: LoginFormValues = {
    email: "",
    password: "",
};

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .lowercase()
        .max(64, "Email must be 64 characters or less")
        .matches(EMAIL_REGEX, {
            message: "Enter a valid email address",
            excludeEmptyString: true,
        })
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .max(128, "Password must be 128 characters or less")
        .required("Password is required"),
});

export type LoginSchema = Yup.InferType<typeof loginValidationSchema>;

export interface LoginFormProps {
    onSubmit: (value: LoginSchema) => Promise<void> | void;
    isLoading?: boolean,
    errorMessage?: string | null;
};

export default function LoginForm({onSubmit, isLoading, errorMessage}: LoginFormProps) {

    const fieldId = useId();

    const emailId = `${fieldId}-email`;
    const passwordId = `${fieldId}-password`;

    return (
        <div>
            <h1 className={clsx(css["title"])}>Вхід</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={loginValidationSchema}
            >
                <Form className={css.form}>
                    <div className={css.field}>
                        <label className={css.label} htmlFor={emailId}>Пошта*</label>
                        <Field
                            id={emailId}
                            as={Input}
                            name="email"
                            type="text"
                            placeholder="hello@relaxmap.ua"
                            className={css.inputForm}
                        />
                        <ErrorMessage
                            name="email"
                            component="span"
                            className={css.error}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor={passwordId}>Пароль*</label>
                        <Field
                            id={passwordId}
                            as={Input}
                            name="password"
                            type="password"
                            placeholder="********"
                            className={css.inputForm}
                        />
                        <ErrorMessage
                            name="password"
                            component="span"
                            className={css.error}
                        />
                    </div>
                    <div>
                        <Button
                            type={"submit"}
                            disabled={isLoading}
                            className={clsx(css["submitButton"])}
                        >
                            {isLoading
                                ? <Spinner color="white"/>
                                : "Увійти"}
                        </Button>
                    </div>
                    {errorMessage && (
                        <div className={css.serverError} role="alert">
                            <Icon className={css.serverErrorIcon} name="error" aria-hidden="true"/>
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
};