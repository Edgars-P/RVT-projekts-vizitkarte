import { A } from "solid-start";

export default function AdminView() {
    return (
        <div class="card">
            <div class="card-header">
                <div class="card-header-title has-background-primary-light">
                    Administratora panelis
                </div>
            </div>
            <div class="card-content">
                <ul>
                    <li><A href="./contacts">Iesniegtie kontakti</A></li>
                </ul>
            </div>
        </div>
    )
}