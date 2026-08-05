// Free field poll type on hold: the team decided not to implement it for now
// (no consensus on how "options" should map to a free-text answer). Commented
// out rather than deleted so it's easy to pick back up.
//
// import { Controller } from "react-hook-form";
// import type {
//   Control,
//   UseFormWatch,
//   UseFormSetValue,
//   FieldErrors,
// } from "react-hook-form";
// import { CardTitle } from "@/components/ui/card";
// import type { PollCreationDTO } from "@shared/schemas/polls.schema";
// import {
//   type PollFormValues,
//   type FreeFormValues,
//   INITIAL_DAYS,
//   daysFromNow,
//   daysUntil,
// } from "../pollForm";
// import EndsInSetting from "@/components/poll/pollCreation/SectionParts/EndsInSetting";
// import AllowVoteChangeSwitch from "@/components/poll/pollCreation/SectionParts/AllowVoteChangeSwitch";
// import HashtagsSelection from "@/components/poll/pollCreation/SectionParts/HashtagsSeletion";
// import AnonymousSwitch from "@/components/poll/pollCreation/SectionParts/AnonymousSwitch";
//
// type FreeFormOptionsProps = {
//   control: Control<FreeFormValues, unknown, PollCreationDTO>;
//   watch: UseFormWatch<FreeFormValues>;
//   setValue: UseFormSetValue<FreeFormValues>;
//   errors: FieldErrors<FreeFormValues>;
// };
//
// export default function OptionsFreeForm({
//   control,
//   watch,
//   setValue,
//   errors,
// }: FreeFormOptionsProps) {
//   return (
//     <div className="space-y-6 flex flex-col w-full">
//       <CardTitle>Options</CardTitle>
//       <Controller
//         control={control}
//         name="endsAt"
//         render={({ field }) => (
//           <EndsInSetting
//             days={field.value ? daysUntil(field.value) : INITIAL_DAYS}
//             initialDays={INITIAL_DAYS}
//             setDays={(days) => field.onChange(daysFromNow(days))}
//           />
//         )}
//       />
//       {errors.endsAt && (
//         <p className="text-sm text-destructive">{errors.endsAt.message}</p>
//       )}
//       <Controller
//         control={control}
//         name="allowChangeVote"
//         render={({ field }) => (
//           <AllowVoteChangeSwitch
//             allowChangeVote={field.value}
//             setAllowChangeVote={field.onChange}
//           />
//         )}
//       />
//       <Controller
//         control={control}
//         name="isAnonymous"
//         render={({ field }) => (
//           <AnonymousSwitch
//             anonymous={field.value}
//             setAnonymous={field.onChange}
//           />
//         )}
//       />
//       {/*
//         HashtagsSelection is typed on PollFormValues and react-hook-form is
//         invariant in the form type, but `hashtags` is the same field in both
//         forms, so it only ever reads/writes something that exists here too.
//       */}
//       <HashtagsSelection
//         watch={watch as unknown as UseFormWatch<PollFormValues>}
//         setValue={setValue as unknown as UseFormSetValue<PollFormValues>}
//       />
//     </div>
//   );
// }
