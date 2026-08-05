// Free field poll type on hold: the team decided not to implement it for now
// (no consensus on how "options" should map to a free-text answer). Commented
// out rather than deleted so it's easy to pick back up.
//
// import type { UseFormRegister, FieldErrors } from "react-hook-form";
// import TitleSetting from "@/components/poll/pollCreation/SectionParts/TitleSetting";
// import PollDescription from "@/components/poll/pollCreation/SectionParts/PollDescription";
// import type { FreeFormValues } from "@/components/poll/pollCreation/pollForm";
//
// type FreeFormHeaderProps = {
//   register: UseFormRegister<FreeFormValues>;
//   errors: FieldErrors<FreeFormValues>;
// };
//
// /** The title is the question here, voters write their own answer. */
// export default function FreeFormHeader({
//   register,
//   errors,
// }: FreeFormHeaderProps) {
//   return (
//     <div className="space-y-5 flex flex-col w-full">
//       <TitleSetting
//         register={register("title")}
//         error={errors.title?.message}
//       />
//       <PollDescription
//         register={register("description")}
//         error={errors.description?.message}
//       />
//     </div>
//   );
// }
