import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
  DefaultValues,
  Path,
  PathValue, // Import PathValue from react-hook-form
} from "react-hook-form";
import { useEffect } from "react";

type TFormConfig<T extends FieldValues> = {
  resolver?: Resolver<T>;
  defaultValues?: DefaultValues<T>;
};

type TFormProps<T extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  onChange?: (data: T) => void;
} & TFormConfig<T>;

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
  onChange,
}: TFormProps<T>) => {
  const methods = useForm<T>({ resolver, defaultValues });
  const { handleSubmit, watch, setValue, reset } = methods;

  const submit: SubmitHandler<T> = async (data) => {
    const success = await onSubmit(data);
    if (success) {
      reset(); // Reset the form only if the mutation was successful
    }
  };

  useEffect(() => {
    const subscription = watch((data) => {
      if (data.fieldA === "specificValue") {
        setValue("fieldB" as Path<T>, "newValue" as PathValue<T, Path<T>>);
      }
      if (onChange) {
        onChange(data as T);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, onChange]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};
export default Form;
