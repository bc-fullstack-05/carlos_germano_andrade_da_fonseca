export const adjustFontSize = (text: string): string => {
    if (text.length > 50) {
      return "16px";
    } else if (text.length > 30) {
      return "20px";
    } else {
      return "24px";
    }
  };