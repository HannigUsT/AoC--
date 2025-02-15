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

  firstList.sort((a, b) => a - b);
  secondList.sort((a, b) => a - b);

  let totalDistance = 0;

  for (let i = 0; i < firstList.length; i++) {
    const distance = firstList[i] - secondList[i];
    totalDistance += Math.abs(distance);
  }

  console.log(totalDistance);
} catch (error) {
  console.log(error);
}
