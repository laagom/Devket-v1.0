# Generated by Django 3.2.13 on 2022-12-02 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pocket', '0003_auto_20221114_1224'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='merchandise',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='payment_amount',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='payment_code',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='payment_method',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='price',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='zip_code',
        ),
        migrations.RemoveField(
            model_name='user',
            name='card_number',
        ),
        migrations.RemoveField(
            model_name='user',
            name='cvc',
        ),
        migrations.RemoveField(
            model_name='user',
            name='expiration_date',
        ),
        migrations.AddField(
            model_name='payment',
            name='amount',
            field=models.PositiveIntegerField(default=100, verbose_name='결제 금액'),
        ),
        migrations.AddField(
            model_name='payment',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='payment',
            name='merchant_id',
            field=models.CharField(default=1, max_length=120, unique=True, verbose_name='주문번호'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='payment',
            name='payment_id',
            field=models.CharField(blank=True, max_length=120, null=True, unique=True, verbose_name='결제번호'),
        ),
        migrations.AddField(
            model_name='payment',
            name='type',
            field=models.CharField(choices=[{'card', '신용카드'}], default='card', max_length=10, verbose_name='결제 수단'),
        ),
        migrations.AlterField(
            model_name='payment',
            name='payment_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='결제갱신일'),
        ),
        migrations.AlterField(
            model_name='payment',
            name='status',
            field=models.CharField(choices=[{'결제대기', 'await'}, {'결제성공', 'paid'}, {'결제실패', 'failed'}, {'결제취소', 'cancelled'}], default='await', max_length=10, verbose_name='결제상태'),
        ),
    ]