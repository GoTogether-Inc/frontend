import { TicketOptionAnswerRequest } from "../model/ticketInformation";

export const buildTicketOptionAnswers = (
  selectedOptions: Record<number, Record<number, string | number | number[]>>
): TicketOptionAnswerRequest[][] => {
  const ticketOptionAnswers: TicketOptionAnswerRequest[][] = [];

  const sortedPageIndices = Object.keys(selectedOptions)
    .map(Number)
    .sort((a, b) => a - b);

  for (const pageIndex of sortedPageIndices) {
    const optionsForPage = selectedOptions[pageIndex];
    const answerList: TicketOptionAnswerRequest[] = [];

    for (const [optionIdStr, value] of Object.entries(optionsForPage)) {
      const ticketOptionId = Number(optionIdStr);

      if (typeof value === "string") {
        answerList.push({ ticketOptionId, answerText: value });
      } else if (typeof value === "number") {
        answerList.push({ ticketOptionId, ticketOptionChoiceId: value });
      } else if (Array.isArray(value)) {
        answerList.push({ ticketOptionId, ticketOptionChoiceIds: value });
      }
    }

    ticketOptionAnswers.push(answerList);
  }

  return ticketOptionAnswers;
};
