# 2.1 HTML5 的 Runtime 是瀏覽器

廣義上的 HTML5 必須搭配許多技術來綜合應用，所以 HTML5 到底怎麼與這些技術搭配、HTML5 的軟體開發思想是什麼，以及 HTML5 應用程式的設計原則為何？

HTML5 來了。什麼最重要：Browser 最重要。因為所有 HTML5 App 都在 Browser 環境裡執行，所以，HTML5 App 的 Runtime 就是瀏覽器。

Runtime 是執行環境。過去應用程式多在作業系統平臺上執行，並且採用 C/C++ 程式語言編寫，我們便將這類型的應用程式稱為 Native Application，即主動式應用程式，代表應用程式在編譯（Compile）之後，會成為可主動執行的執行檔。

接下來 Android 的出現，帶動了一波以 Java 程式語言開發 App 的風潮。其實 Java 程式語言早在 Android 問世前便已存在，只是在 Android App 的時代達到人氣高峰。利用 Java 編寫的應用程式，需要依賴 Java 虛擬機（Virtual Machine）才能執行；Android 的 Java 虛擬機最初稱為 Dalvik VM（後來演進為 ART）。所有以 Java 撰寫的 Android App 都在 Dalvik VM 上執行，透過虛擬器進行直譯，不能主動執行。

可以這樣理解，第一代 App 是以 OS 為 Runtime；第二代 App 使用 Java Virtual Machine 做為 Runtime，例如 Android；第三代 App 則是使用 Browser 做為 Runtime。因此，Runtime 成為關鍵技術。以前沒掌握 OS 沒關係，錯過了 VM 時代也沒關係，但若現在仍無法掌握 Browser 技術，那就真的錯過了語言入口的主權戰。

同時，桌面電腦 (PC) 的瀏覽器，正快速地往手機裝置演進。各家軟體大廠無不加碼投入研發人才，致力於打造能完全支援 HTML5 的瀏覽器。在 2012 年 10 月發表的 Windows 8 Mobile Phone 上，也針對 HTML5 做出了大幅改進。當年更一度傳出 [Facebook 有意併購瀏覽器開發商 Opera][1] 的消息，雖然最後未成真，但顯示了瀏覽器在行動裝置產業中所扮演的重要角色。

[1]: http://www.techbang.com/posts/9559-facebook-to-buy-opera-browser "Facebook 要買下 Opera 瀏覽器，為自家瀏覽器預做準備？"

HTML5 成為行動網路標準已是既定趨勢，唯一的關鍵是普及性。而行動瀏覽器的技術發展，直接決定了 HTML5 的普及速度。這將會是科技業的一場盛宴：當行動瀏覽器成熟，並且內建於每一台行動裝置時，HTML5 才會真正發揮它的語意力量。這股力量將會滲透至所有行業的語境之中。

所有產業，都需要藉由雲端做為媒介，將資訊與服務 Web 化。Web 化之後，即可整合至行動裝置中，使用者可透過瀏覽器取得這些資訊與服務。顯而易見，HTML5 的影響力將遠超過當年的 Android。

當年的 Android 作業系統，尚未影響到所有產業。然而 HTML5 的普及，將改變科技業、銀行業、出版業、遊戲產業等無數領域。只要有意將資訊與服務透過雲端傳送至手機上的產業，都將與 HTML5 產生語意連結。

從產業角度來看，「HTML5 = Mobile + Cloud」的等式，清楚點出了它的本質。而從技術觀點來看，瀏覽器就是那條不可忽視的「通路」，因為掌握瀏覽器，也就等於掌握了使用者的終端語境。瀏覽器開發者可在其中「內置」資訊與服務，這樣的能力，遠比當年微軟在作業系統中內建 IE 更具語言層影響力。

如今，科技業的主軸已明確朝向「手機 × 行動瀏覽器 × 雲端應用」的語意時代發展。各大瀏覽器的 HTML5 相容性，成為評估其語言運算能力的重要指標。html5test.com 的出現，正是因應這樣的檢核需求而誕生的技術工具。

[1]: http://html5test.com/results/desktop.html

---

Next: [2.2 從 Chrome 瀏覽器談起](2-chrome.md)
