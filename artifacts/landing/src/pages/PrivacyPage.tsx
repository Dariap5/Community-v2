import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-3xl mx-auto px-5 md:px-12 py-16 md:py-24">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Вернуться на главную
        </a>

        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-sm text-muted-foreground/60">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">1. Общие положения</h2>
            <p>
              Мы уважаем вашу приватность и обязуемся защищать ваши персональные данные. Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем информацию при предоставлении услуг через наше сообщество.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">2. Какую информацию мы собираем</h2>
            <p>При регистрации и использовании услуг мы собираем:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Имя и контактные данные (Telegram ID)</li>
              <li>Email (если предоставлен)</li>
              <li>Информация о платежах и подписке</li>
              <li>Публичные сообщения в сообществе</li>
              <li>Данные о взаимодействии (просмотры, активность)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">3. Как мы используем информацию</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Для предоставления и улучшения услуг</li>
              <li>Для обработки платежей</li>
              <li>Для отправки уведомлений о событиях сообщества</li>
              <li>Для анализа использования и оптимизации</li>
              <li>Для соответствия юридическим требованиям</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">4. Защита данных</h2>
            <p>
              Мы используем стандартные меры безопасности для защиты ваших данных, включая шифрование и ограничение доступа. Однако ни одна система не является полностью безопасной, и мы не можем гарантировать абсолютную защиту.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">5. Конфиденциальность в сообществе</h2>
            <p>
              Ваши личные сообщения в buddy-сессиях являются конфиденциальными. Сообщения в групповых чатах видны всем участникам сообщества.
            </p>
            <p>
              Участники не должны делиться информацией о других членах без их согласия.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">6. Передача данных третьим лицам</h2>
            <p>
              Мы не передаём ваши персональные данные третьим лицам без вашего согласия, за исключением:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Партнёрам платежных систем (Telegram Pay и т.д.)</li>
              <li>Требованиям закона или органов власти</li>
              <li>Защиты прав и безопасности сообщества</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">7. Cookies и трекинг</h2>
            <p>
              Мы используем cookies только для функционирования сервиса. Мы не используем трекеры для поведения пользователя без явного согласия.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">8. Ваши права</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Запросить доступ к вашим данным</li>
              <li>Запросить исправление неверных данных</li>
              <li>Запросить удаление данных (с некоторыми исключениями)</li>
              <li>Отозвать согласие на обработку</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">9. Удаление аккаунта</h2>
            <p>
              При удалении аккаунта мы удалим ваши персональные данные из наших систем в течение 30 дней, за исключением информации, которая должна храниться по закону.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">10. Изменения политики</h2>
            <p>
              Мы можем обновлять эту политику. Существенные изменения будут сообщены вам через уведомление в сообществе.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-foreground">11. Контакты</h2>
            <p>
              По вопросам конфиденциальности напишите нам в Telegram: <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@community_support</a>
            </p>
          </section>

          <div className="border-t border-border/30 pt-8 mt-12">
            <p className="text-sm text-muted-foreground/60">
              © {new Date().getFullYear()} Закрытое комьюнити. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
