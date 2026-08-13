// Free field poll type on hold: the team decided not to implement it for now
// (no consensus on how "options" should map to a free-text answer). Commented
// out rather than deleted so it's easy to pick back up.
//
// import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { CardContent } from "@/components/ui/card";
// import {
//   PollCreateSchema,
//   type PollCreateDTO,
// } from "@shared/schemas/polls.schema";
// import { useCreatePoll } from "@/hooks/poll/use-create-poll";
// import { toast } from "sonner";
// import { ApiError } from "@/lib/fetcher";
// import FreeFormHeader from "@/components/poll/pollCreation/SectionParts/HeaderFreeForm";
// import OptionsFreeForm from "@/components/poll/pollCreation/SectionParts/OptionsFreeForm";
// import { freeFormDefaultValues, type FreeFormValues } from "./pollForm";
//
// export default function FreeFormSection() {
//   const { trigger, isMutating } = useCreatePoll();
//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<FreeFormValues, unknown, PollCreateDTO>({
//     resolver: zodResolver(PollCreateSchema) as Resolver<
//       FreeFormValues,
//       unknown,
//       PollCreateDTO
//     >,
//     defaultValues: freeFormDefaultValues,
//   });
//
//   const onSubmit: SubmitHandler<PollCreateDTO> = async (data) => {
//     try {
//       await trigger(data);
//       toast.success("Poll created");
//       reset(freeFormDefaultValues);
//     } catch (err) {
//       if (err instanceof ApiError) toast.error(err.message);
//       else toast.error("An unknown error occurred");
//     }
//   };
//
//   return (
//     <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
//       <CardContent className="grid lg:grid-cols-[3fr_auto_2fr] gap-8">
//         <FreeFormHeader register={register} errors={errors} />
//         <Separator orientation="vertical" />
//         <OptionsFreeForm
//           control={control}
//           watch={watch}
//           setValue={setValue}
//           errors={errors}
//         />
//       </CardContent>
//       <div className="flex justify-end">
//         <Button type="submit" size="lg" disabled={isMutating}>
//           Create poll
//         </Button>
//       </div>
//     </form>
//   );
// }
