export const createFieldMappings = (response: Record<string, any>[]) => {
    if (!response || response.length === 0) return { fieldMap: {}, fieldMapToKorean: {} };

    const sampleResponse = response[0];
    const fieldMap: Record<string, string> = {};  
    const fieldMapToKorean: Record<string, string> = {};

    Object.keys(sampleResponse).forEach((key) => {
        fieldMap[key] = key; 

        fieldMapToKorean[key] = key === 'name' ? '이름' :
                               key === 'phone' ? '전화번호' :
                               key === 'email' ? '이메일' :
                               key === 'grade' ? '학년' :
                               key === 'num' ? '학번' :
                               key;  
    });
    return { fieldMap, fieldMapToKorean };
};
