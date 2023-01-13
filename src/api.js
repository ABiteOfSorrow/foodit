export default async function getFoods({order = "", cursor = "", limit = 10}) {
    const query = `order=${order}&cursor=${cursor}&limit=${limit}`
    const rawResponse = await fetch(`https://learn.codeit.kr/9026/foods?${query}`);
    const response = await rawResponse.json();
    return response;
}

