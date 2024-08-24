
export default function DamageSeverity() {
    return (
        <div>
            <h1>Damage Severity</h1>
            <table>
                <tr>
                    <th>Character Level</th>
                    <th>Setback</th>
                    <th>Dangerous</th>
                    <th>Deadly</th>
                </tr>
                <tr>
                    <td>1st - 4th</td>
                    <td>1d10</td>
                    <td>2d10</td>
                    <td>4d10</td>
                </tr>
                <tr>
                    <td>5th - 10th</td>
                    <td>2d10</td>
                    <td>4d10</td>
                    <td>10d10</td>
                </tr>
                <tr>
                    <td>11th - 16th</td>
                    <td>4d10</td>
                    <td>10d10</td>
                    <td>18d10</td>
                </tr>
                <tr>
                    <td>17th - 20th</td>
                    <td>10d10</td>
                    <td>18d10</td>
                    <td>424d10</td>
                </tr>

            </table>
        </div>
    );
}