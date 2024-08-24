
export default function Tracking() {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Ground Surface</th>
                    <th>DC</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Soft surface such as snow</td>
                    <td>10</td>

                </tr>
                <tr>
                    <td>Dirt or grass</td>
                    <td>15</td>

                </tr>
                <tr>
                    <td>Bare stone</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>Each day since the creature passed</td>
                    <td>+5</td>
                </tr>
                <tr>
                    <td>Creature left a trail such as blood</td>
                    <td>-5</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}