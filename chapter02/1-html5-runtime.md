# 2.1 HTML5 的 Runtime 是瀏覽器

廣議上的HTML5必須搭配許多技術來綜合應用，所以HTML5倒底怎麼跟這些技術搭配、HTML5的軟體開發思想是什麼，以及HTML5應用程式的設計原則為何？

HTML5 來了。什麼最重要：Browser 最重要。因為所有 HTML5 App 都在 Browser 環境裡執行，所以，HTML5 App 的 Runtime 就是瀏覽器。

Runtime 是執行環境。過去應用程式都是在作業系統平臺上執行，並且採用 C/C++ 程式語言編寫，我們便將這類型的應用程式稱為 Native Application，即主動式應用程式，代表應用程式被編譯後（Compile）就是一個可主動執行的執行檔。

接下來 Android 出現後，帶動一個以 Java程式語言來開發App的風潮。Java 程式語言早在 Android 問世前就已經被發明出來，雖後在 Android App 的年代人氣達到頂峰。利用 Java 程式語言編寫的應用程式，都需要 Java 虛擬機（Virtual Machine）才能執行；Android 的 Java 虛擬機稱為 Dalvik VM。所有以 Java 撰寫的 Android App 都在 Dalvik VM 上執行，它是由虛擬器來管理並直譯，不能主動執行。

可以這樣想，第一代的 App 使用 OS 做為 Runtime。第二代的 App 使用 Java Virtual Machine 做為 Runtime，例如：Android。第三代的 App 將使用 Browser 做為 Runtime。所以，Runtime 就是個關鍵技術。以前沒有掌握好 OS 沒關係，過去沒掌握好 VM 沒關係，現在還是沒掌握好 Browser 技術，就很有關係了。

同時，過去桌面電腦(PC)的瀏覽器，正快速往手機裝置移動。 各家軟體大廠無不加碼研發人才，努力打造一個能完全相容 HTML5 的瀏覽器，在 2012 年10月份現身的 Windows 8 Mobile Phone，也在 HTML5 做了很大的改進。2012 年，更傳出 [Facebook 有意購併老字號的瀏覽器開發商 Opera][1]，這個傳言最後沒有成真，但顯示了瀏覽器在行動裝置產業的重要性。

[1]: http://www.techbang.com/posts/9559-facebook-to-buy-opera-browser "Facebook 要買下 Opera 瀏覽器，為自家瀏覽器預做準備？"

HTML5 成為移動網路的標準已經是既定的事實了，唯一的關鍵是它的普及性。而行動瀏覽器技術，直接決定了 HTML5 的普及速度。這會是科技業的大盛宴，當行動瀏覽器成熟，並且安裝到每一台行動裝置上時，HTML5 將開始展現它的強大影響力。這個的影響力的層面相當廣，它會普及到各行各業。

所有的行業，都需要雲端做為媒體，將資訊與服務Web化，Web化後都能整合到行動裝置上。在行動裝置上，可以使用瀏覽器來使用這些資訊與服務。很明顯地，HTML5 的影響力將遠超過當年的 Android。

當年的 Android 作業系統，還不算是各行各業的事情。但是，HTML5 將影響到科技業、銀行業、出版業、遊戲業等等，數都數不清的行業別都將因 HTML5 起變化。將透過雲端將資訊與服務，傳遞到手機上的行業，都需要 HTML5。

所以，從產業的角度來看，「HTML5 = Mobile + Cloud」，這很簡單地說明了一切。從技術上來看，瀏覽器也是非常重要的「通路」，因為掌握了瀏覽器，等於控制了使用者的手機。瀏覽器開發廠，可以在瀏覽器「內置」一些資訊與服務。在瀏覽器內置服務，這一想就知道是多麼可怕的一件事情，這比起當初微軟在其作業系統裡內建IE瀏覽器還可怕。

現在，科技業的主流發展趨勢，已經抵定了「手機、行動瀏覽器與雲端應用」的時代。各大瀏覽器與 HTML5 的相容性，成為相當重要的指標。因運而生的網站 html5test.com 可以幫助我們了解瀏覽器的 HTML5 相容性。

[1]: http://html5test.com/results/desktop.html

---

Next: [2.2 從 Chrome 瀏覽器談起](2-chrome.md)
