export default function generateCSVFile(fileInfo) {
    if (!fileInfo || Object.keys(fileInfo).length === 0) throw new Error('File invalid');

    const blob = new Blob([fileInfo.body], {
        type: 'text/plain',
    });
    const file = new File([blob], fileInfo.name);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = window.URL.createObjectURL(file);
    a.download = fileInfo.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(a.href);
}