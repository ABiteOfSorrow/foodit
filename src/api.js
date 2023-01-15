export default async function getFoods({order = "", cursor = "", limit = 10, search = ""}) {
    const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
    const rawResponse = await fetch(`https://learn.codeit.kr/9026/foods?${query}`);

    if (!rawResponse.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다!');
    }
    const response = await rawResponse.json();
    return response;
}

