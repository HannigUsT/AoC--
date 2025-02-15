try {
  const __dirname = new URL(".", import.meta.url).pathname;
  const file = await Deno.open(`${__dirname}/input.txt`, { read: true });

  const reader = file.readable.pipeThrough(new TextDecoderStream());
  const firstList: number[] = [];
  const secondList: number[] = [];

  for await (const chunk of reader) {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    for (const line of lines) {
      const parts = line.split(/\s+/).map(Number);
      const leftNum = parts[0];
      const rightNum = parts[1];

      firstList.push(leftNum);
      secondList.push(rightNum);
    }
  }

  const rightHashMap = new Map<number, number>();
  for (const num of secondList) {
    rightHashMap.set(num, (rightHashMap.get(num) || 0) + 1);
  }

  let similarityScore = 0;
  for (const num of firstList) {
    similarityScore += (rightHashMap.get(num) || 0) * num;
  }

  console.log(similarityScore);
} catch (error) {
  console.log(error);
}
